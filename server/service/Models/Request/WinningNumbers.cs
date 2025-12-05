using System.ComponentModel.DataAnnotations;

namespace service;

public class WinningNumbers
{
    [Required] [Length(minimumLength: 3, maximumLength: 3)] public ISet<int> numbers { get; set; }
}